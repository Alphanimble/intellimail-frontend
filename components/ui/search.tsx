"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import VoiceButton from "./custom/VoiceButton";

export default function InputDemo({ onSearch, onTranscription }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        onSearch(inputValue);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inputValue, onSearch]);

  const handleTranscription = (text) => {
    setInputValue(text);
    onTranscription(text);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id="input-27"
          className="peer pe-9 ps-9"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="presentation"
            />
          ) : (
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
        <VoiceButton onTranscription={handleTranscription} />
      </div>
    </div>
  );
}
