import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
  onChange,
}) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
      onChange={onChange}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
