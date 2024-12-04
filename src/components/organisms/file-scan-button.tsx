import { Button } from "rizzui"

import { MdOutlineScanner } from "react-icons/md";
import { useDrawer } from "@/lib/store/drawer.store";
import { ScanFileForm } from "./forms/scan-file-form";

export const FileScanButton = ({ getFiles }: {
  getFiles: any
}) => {
  const { openDrawer } = useDrawer();

  const title = 'Scan & Extract';
  const description = 'Scan a new file and extract';

  return (
    <Button
      onClick={() => {
        openDrawer(ScanFileForm, title, description, { getFiles });
      }}
      className="w-full 375px:w-auto"
    >
      <MdOutlineScanner className="h-4 w-4 mr-1.5" />
      Scan & Extract
    </Button>
  )
}