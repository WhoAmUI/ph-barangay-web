"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useMemo, useState } from "react";

interface ILocation {
  code: string;
  name: string;
}

const Combobox = ({
  defaultValue = "",
  data,
  onSetValue,
}: {
  defaultValue: string | undefined;
  data: ILocation[];
  onSetValue: (location: ILocation | undefined) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  const getLocation = useMemo(
    () => data.find((d) => d.name === value),
    [value, data]
  );

  useEffect(() => {
    onSetValue(getLocation);
  }, [getLocation, onSetValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {defaultValue
            ? defaultValue
            : value
              ? getLocation?.name
              : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No Location found.</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.code}
                  value={d.name}
                  defaultValue={defaultValue}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {d.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === d.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
