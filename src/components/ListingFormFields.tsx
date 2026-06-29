import LocationSelect from "@/components/LocationSelect";

export default function ListingFormFields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">प्रकार</label>
          <select
            name="type"
            required
            defaultValue="PILLU"
            className="input-field"
          >
            <option value="PILLU">पिल्लू (करडू)</option>
            <option value="SHELI">शेळी</option>
            <option value="BOKAD">बोकड</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">लिंग</label>
          <select
            name="gender"
            defaultValue=""
            className="input-field"
          >
            <option value="">--</option>
            <option value="MALE">नर</option>
            <option value="FEMALE">मादी</option>
          </select>
        </div>
      </div>

      <LocationSelect />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            वय (महिने)
          </label>
          <input
            type="number"
            name="ageMonths"
            min={0}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            किंमत (₹, ऐच्छिक)
          </label>
          <input
            type="number"
            name="price"
            min={0}
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="priceNegotiable"
            id="priceNegotiable"
            defaultChecked
            className="w-4 h-4"
          />
          <label htmlFor="priceNegotiable" className="text-sm">
            बोलणी करता येईल
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="vaccinated"
            id="vaccinated"
            className="w-4 h-4"
          />
          <label htmlFor="vaccinated" className="text-sm">
            लसीकरण झालेलं
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
        <input
          type="checkbox"
          name="occasionReady"
          id="occasionReady"
          className="w-4 h-4"
        />
        <label htmlFor="occasionReady" className="text-sm">
          🙏 हा बोकड/शेळी नवस/सणासाठी उपलब्ध आहे
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          संपर्क मोबाईल नंबर (ऐच्छिक)
        </label>
        <input
          type="tel"
          name="contactPhone"
          placeholder="9876543210"
          className="input-field"
        />
        <p className="text-xs text-stone-400 mt-1">
          रिकामं ठेवल्यास तुमचा नोंदणीकृत मोबाईल नंबर वापरला जाईल.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          फोटो (२-३ फोटो टाकू शकता)
        </label>
        <input
          type="file"
          name="photos"
          accept="image/*"
          multiple
          className="input-field"
        />
      </div>
    </>
  );
}
