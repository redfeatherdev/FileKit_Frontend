import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';

import { useDrawer } from '@/lib/store/drawer.store';
import { ScanFileForm } from '@/components/organisms/forms/scan-file-form';

const title = 'Scan File';
const description = 'Add your files to scan';

const ScanButton = () => {
  const { openDrawer } = useDrawer();

  return (
    <>
      <Button
        className="px-3 sm:px-4"
        onClick={() => {
          openDrawer(ScanFileForm, title, description);
        }}
      >
        <PiPlusBold className="h-4 w-4" />
        <span className="ms-1.5 ">Add New</span>
      </Button>
    </>
  )
}

export default ScanButton;