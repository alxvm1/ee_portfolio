import { type THeaderSwitchOptions } from "./ui/HeaderSwitch/types";

export interface IHeaderProps {
  activeSection: THeaderSwitchOptions;
  onSectionChange: (section: THeaderSwitchOptions) => void;
}
