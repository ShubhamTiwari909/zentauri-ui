import { Input } from "@/components/ui/inputs";

const page = () => {
  return (
    <div className="max-w-xl mx-auto py-30 space-y-4">
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="file"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="date"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="number"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="color"
      />
       <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="checkbox"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="radio"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        appearance="pink"
        className="w-full"
        type="range"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="search"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="tel"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="time"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="url"
      />
      <Input
        placeholder="Type to update state"
        aria-label="Controlled field"
        className="w-full"
        type="week"
      />
    </div>
  );
};

export default page;
