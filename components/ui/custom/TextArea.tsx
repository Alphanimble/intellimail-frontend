import React from "react";
import { Textarea } from "@/components/ui/textarea";

const TextArea = ({ value, onChange }) => {
  return (
    <Textarea
      placeholder="Transcribed text will appear here..."
      value={value}
      onChange={onChange}
      className="w-full h-48 mt-4"
    />
  );
};

export default TextArea;
