
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

interface XRPAddressInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

export const XRPAddressInput = ({
  value,
  onChange,
  label,
  placeholder,
}: XRPAddressInputProps) => {
  const { t } = useTranslation();
  const exampleAddress = "rHNTXD6a7VfFzQK9bNMkX4kYD8nLjhgb32";

  const handleApplyExample = () => {
    onChange(exampleAddress);
    console.debug("[UI] Applied example XRP address:", exampleAddress);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="xrpAddress" className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        {label}
      </Label>
      <Input
        id="xrpAddress"
        name="xrpAddress"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="transition-all focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{t('fields.xrpAddress.example')}: {exampleAddress}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs"
          onClick={handleApplyExample}
        >
          {t('fields.xrpAddress.apply')}
        </Button>
      </div>
    </div>
  );
};

