import { useState } from "react";
import { useFilter } from "~/context/FilterContext";

const roleTags = [
  "Product",
  "Frontend",
  "Backend",
  "Software",
  "Senior",
  "Staff",
  "Lead",
  "Remote",
];
const locationTags = ["Remote", "Germany", "India", "United States"];
const salaryTags = [
  { text: "With Salary", value: "$" },
  { text: "No Salary", value: "NO_SALARY" },
];
const descriptionTags = [
  "Javascript",
  "Typescript",
  "React",
  "Node",
  "GraphQL",
  "AWS",
  "Cybersecurity",
];

export function TagWidget() {
  const {
    setRoleFilter,
    setSalaryFilter,
    setLocationFilter,
    setDescriptionFilter,
  } = useFilter();
  const [selectedTags, setSelectedTags] = useState({
    role: "",
    location: "",
    salary: "",
    description: "",
  });

  type TagCategory = "role" | "location" | "salary" | "description";

  const toggleTagSelection = (tagValue: string, category: TagCategory) => {
    const newSelectedTags = { ...selectedTags };

    if (newSelectedTags[category] === tagValue) {
      newSelectedTags[category] = "";
    } else {
      newSelectedTags[category] = tagValue;
    }

    setSelectedTags(newSelectedTags);

    // Update the appropriate filter
    switch (category) {
      case "role":
        setRoleFilter(newSelectedTags.role);
        break;
      case "location":
        setLocationFilter(newSelectedTags.location);
        break;
      case "salary":
        setSalaryFilter(newSelectedTags.salary);
        break;
      case "description":
        setDescriptionFilter(newSelectedTags.description);
      default:
        break;
    }
  };

  const isTagSelected = (tag: string, category: TagCategory) =>
    selectedTags[category] === tag;

  return (
    <div className="min-w-full bg-slate-200 pt-4">
      <div className="flex overflow-x-auto pb-2">
        {/* Category: Role */}
        <div
          className="ml-3 flex flex-col items-start md:ml-6"
          style={{
            borderRight: "1px solid #ccc",
            paddingRight: "1rem",
            marginRight: "1rem",
          }}
        >
          <p className="font-sm mb-1 text-sm">Role:</p>
          <div className="border-r-solid border-blue flex gap-2">
            {roleTags.map((tag) => (
              <button
                key={tag}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                  isTagSelected(tag, "role")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => toggleTagSelection(tag, "role")}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category: Salary */}
        <div
          className="flex flex-col items-start"
          style={{
            borderRight: "1px solid #ccc",
            paddingRight: "1rem",
            marginRight: "1rem",
          }}
        >
          <p className="font-sm mb-1 text-sm">Salary:</p>
          <div className="flex gap-2">
            {salaryTags.map((tag) => (
              <button
                key={tag.text}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                  isTagSelected(tag.value, "salary")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => toggleTagSelection(tag.value, "salary")}
              >
                {tag.text}
              </button>
            ))}
          </div>
        </div>

        {/* Category: Location */}
        <div
          className="flex flex-col items-start"
          style={{
            borderRight: "1px solid #ccc",
            paddingRight: "1rem",
            marginRight: "1rem",
          }}
        >
          <p className="font-sm mb-1 text-sm">Location:</p>
          <div className="flex gap-2">
            {locationTags.map((tag) => (
              <button
                key={tag}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                  isTagSelected(tag, "location")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => toggleTagSelection(tag, "location")}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Category: Description */}
        <div className="flex flex-col items-start">
          <p className="font-sm mb-1 text-sm">Description:</p>
          <div className="flex gap-2">
            {descriptionTags.map((tag) => (
              <button
                key={tag}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                  isTagSelected(tag, "description")
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => toggleTagSelection(tag, "description")}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
