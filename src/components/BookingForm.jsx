"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const LOCATION_DATA = {
  Dhaka: {
    Dhaka: {
      DhakaCity: ["Dhanmondi", "Mirpur", "Uttara", "Mohammadpur"],
      GazipurCity: ["Tongi", "Joydebpur"],
    },
    Narayanganj: {
      NarayanganjCity: ["Fatullah", "Chashara", "Siddhirganj"],
    },
  },
  Chattogram: {
    Chattogram: {
      ChattogramCity: ["Panchlaish", "Agrabad", "Kotwali"],
    },
    CoxsBazar: {
      CoxsBazarCity: ["Kolatoli", "Teknaf"],
    },
  },
  Rajshahi: {
    Rajshahi: {
      RajshahiCity: ["Boalia", "Motihar"],
    },
  },
};

export default function BookingForm({ service }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    durationType: "days",
    durationValue: 1,
    division: "Dhaka",
    district: "Dhaka",
    city: "DhakaCity",
    area: "Dhanmondi",
    address: "",
  });

  const districtOptions = useMemo(
    () => Object.keys(LOCATION_DATA[form.division] || {}),
    [form.division]
  );

  const cityOptions = useMemo(
    () => Object.keys(LOCATION_DATA[form.division]?.[form.district] || {}),
    [form.division, form.district]
  );

  const areaOptions = useMemo(
    () => LOCATION_DATA[form.division]?.[form.district]?.[form.city] || [],
    [form.division, form.district, form.city]
  );

  const unitPrice =
    form.durationType === "days" ? Number(service.price || 0) : Number(service.price || 0) / 8;
  const unitLabel = form.durationType === "days" ? "day" : "hour";
  const totalCost = Math.max(1, Number(form.durationValue || 0)) * unitPrice;

  const onDivisionChange = (division) => {
    const firstDistrict = Object.keys(LOCATION_DATA[division] || {})[0] || "";
    const firstCity = Object.keys(LOCATION_DATA[division]?.[firstDistrict] || {})[0] || "";
    const firstArea = LOCATION_DATA[division]?.[firstDistrict]?.[firstCity]?.[0] || "";

    setForm((prev) => ({
      ...prev,
      division,
      district: firstDistrict,
      city: firstCity,
      area: firstArea,
    }));
  };

  const onDistrictChange = (district) => {
    const firstCity = Object.keys(LOCATION_DATA[form.division]?.[district] || {})[0] || "";
    const firstArea = LOCATION_DATA[form.division]?.[district]?.[firstCity]?.[0] || "";

    setForm((prev) => ({
      ...prev,
      district,
      city: firstCity,
      area: firstArea,
    }));
  };

  const onCityChange = (city) => {
    const firstArea = LOCATION_DATA[form.division]?.[form.district]?.[city]?.[0] || "";
    setForm((prev) => ({
      ...prev,
      city,
      area: firstArea,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.address.trim()) {
      setError("Address is required.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        serviceId: service._id,
        serviceTitle: service.title,
        servicePrice: Number(service.price || 0),
        durationType: form.durationType,
        durationValue: Number(form.durationValue),
        location: {
          division: form.division,
          district: form.district,
          city: form.city,
          area: form.area,
          address: form.address,
        },
        totalCost: Number(totalCost.toFixed(2)),
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Booking failed.");
        return;
      }

      setMessage("Booking confirmed. Current status: Pending.");
      setTimeout(() => {
        router.push("/my-bookings");
      }, 900);
    } catch {
      setError("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">{error}</p>}
      {message && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-lg">{message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration Type</label>
          <select
            value={form.durationType}
            onChange={(e) => setForm((prev) => ({ ...prev, durationType: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="days">Days</option>
            <option value="hours">Hours</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration Value</label>
          <input
            min={1}
            type="number"
            value={form.durationValue}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                durationValue: e.target.value,
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
          <select
            value={form.division}
            onChange={(e) => onDivisionChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {Object.keys(LOCATION_DATA).map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
          <select
            value={form.district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {districtOptions.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            value={form.city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <select
            value={form.area}
            onChange={(e) => setForm((prev) => ({ ...prev, area: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
        <textarea
          rows={3}
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="House, road, block, nearby landmark"
          required
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-gray-600 text-sm">
          Service Charge: Tk {unitPrice.toFixed(2)} / {unitLabel}
        </p>
        <p className="text-gray-600 text-sm">
          Calculation: {Math.max(1, Number(form.durationValue || 0))} x {unitPrice.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm">Total Cost</p>
        <p className="text-2xl font-extrabold text-emerald-600">Tk {totalCost.toFixed(2)}</p>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-70"
      >
        {loading ? "Confirming..." : "Confirm Booking"}
      </button>
    </form>
  );
}
