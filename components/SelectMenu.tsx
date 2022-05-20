import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export interface SelectMenuOption {
  label: string;
  value: string;
}

interface SelectMenuProps {
  options: SelectMenuOption[];
  selected?: SelectMenuOption;
  placeholder?: string;
  onChange: (value?: string) => void;
}

const SelectMenu = ({
  options,
  selected,
  placeholder,
  onChange,
}: SelectMenuProps) => {
  return (
    <Listbox value={selected?.value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button
              className={`
                relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-0 sm:text-sm
                ${selected?.value ? "" : "text-gray-500"} 
              `}
            >
              <span className="block truncate">
                {selected?.label ?? placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) => `
                        ${active ? "bg-gray-100" : ""}
                        relative cursor-pointer select-none py-2 pl-3 pr-9
                    `}
                    value={option.value}
                  >
                    {({ selected }) => (
                      <span
                        className={`
                          block truncate
                          ${selected ? "font-semibold" : "font-normal"}
                        `}
                      >
                        {option.label}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenu;
