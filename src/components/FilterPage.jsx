import { useLoaderData, useSearchParams } from "react-router-dom";

export default function FilterPage() {
  const regions = useLoaderData();
  console.log("Data dari Loader:", regions);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvince = searchParams.get("province") || "";
  const selectedDistrict = searchParams.get("district") || "";
  const selectedRegency = searchParams.get("regency") || "";

  const availableRegency = regions.regencies.filter(
    (item) => item.province_id === Number(selectedProvince),
  );
  const availableDistrict = regions.districts.filter(
    (item) => item.regency_id === Number(selectedRegency),
  );

  const provinceObj = regions.provinces.find(
    (p) => p.id === Number(selectedProvince),
  );
  const regencyObj = regions.regencies.find(
    (p) => p.id === Number(selectedRegency),
  );
  const districtObj = regions.districts.find(
    (p) => p.id === Number(selectedDistrict),
  );

  return (
    <div className="min-h-screen flex">
      <aside className="w-80 p-4 bg-gray-100">
        <h1 className="text-xl font-bold text-center mt-4">
          Frontend Assesment
        </h1>
        <h3 className="text-gray-400 text-sm p-4 mt-10">FILTER WILAYAH</h3>

        <div className="flex flex-col p-4 gap-3">
          <label>PROVINSI</label>
          <select
            name="province"
            className="p-3 rounded-xl shadow-md outline-1 cursor-pointer"
            value={selectedProvince}
            onChange={(e) => setSearchParams({ province: e.target.value })}
          >
            <option value="">Pilih Provinsi</option>
            {regions.provinces.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>

          <label>KOTA/KABUPATEN</label>
          <select
            name="regency"
            className="p-3 rounded-xl shadow-md outline-1 cursor-pointer"
            value={selectedRegency}
            onChange={(e) =>
              setSearchParams({
                province: selectedProvince,
                regency: e.target.value,
              })
            }
            disabled={!selectedProvince}
          >
            <option value="">Pilih Kota</option>
            {availableRegency.map((reg) => (
              <option value={reg.id} key={reg.id}>
                {reg.name}
              </option>
            ))}
          </select>

          <label>KECAMATAN</label>
          <select
            name="district"
            className="p-3 rounded-xl shadow-md outline-1 cursor-pointer"
            value={selectedDistrict}
            onChange={(e) =>
              setSearchParams({
                province: selectedProvince,
                regency: selectedRegency,
                district: e.target.value,
              })
            }
            disabled={!selectedRegency}
          >
            <option value="">Pilih Kecamatan</option>
            {availableDistrict.map((dist) => (
              <option value={dist.id} key={dist.id}>
                {dist.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="p-3 mt-10 rounded-xl shadow-md bg-blue-100 outline-2 outline-blue-500 cursor-pointer"
            onClick={() => setSearchParams({})}
          >
            RESET
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="breadcrumb flex flex-row items-center p-6 bg-white shadow-sm text-sm">
          <span
            className={
              !provinceObj ? "text-blue-600 font-bold" : "text-gray-400"
            }
          >
            Indonesia
          </span>

          {provinceObj && (
            <>
              <span className="mx-2 text-gray-400">{">"}</span>
              <span
                className={
                  !regencyObj ? "text-blue-600 font-bold" : "text-gray-400"
                }
              >
                {provinceObj.name}
              </span>
            </>
          )}

          {regencyObj && (
            <>
              <span className="mx-2 text-gray-400">{">"}</span>
              <span
                className={
                  !districtObj ? "text-blue-600 font-bold" : "text-gray-400"
                }
              >
                {regencyObj.name}
              </span>
            </>
          )}

          {districtObj && (
            <>
              <span className="mx-2 text-gray-400">{">"}</span>
              <span className="text-blue-600 font-bold">
                {districtObj.name}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col justify-center flex-1 space-y-8 gap-4 bg-gray-100">
          {provinceObj ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-blue-300 text-sm font-semibold">
                PROVINSI
              </span>
              <span className="text-5xl font-bold">{provinceObj.name}</span>
            </div>
          ) : (
            ""
          )}

          {regencyObj ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-500 mb-10">↓</span>
              <span className="text-blue-300 text-sm font-semibold">
                KOTA / KABUPATEN
              </span>
              <span className="text-5xl font-bold">{regencyObj.name}</span>
            </div>
          ) : (
            ""
          )}

          {districtObj ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500 mb-10">↓</p>
              <p className="text-blue-300 text-sm font-semibold">KECAMATAN</p>
              <p className="text-5xl font-bold">{districtObj.name}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
