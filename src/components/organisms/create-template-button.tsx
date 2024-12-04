import { Button } from "rizzui"

import { PiPlusBold } from 'react-icons/pi';
import { useDrawer } from "@/lib/store/drawer.store";
import { CreateTemplateForm } from "./forms/create-template-form";

export const CreateTemplateButton = ({ getTemplates }: {
  getTemplates: any
}) => {
  const { openDrawer } = useDrawer();

  const title = 'Add Template';
  const description = 'Add a new template.';

  return (
    <Button
      onClick={() => {
        openDrawer(CreateTemplateForm, title, description, { getTemplates });
      }}
      className="w-full 375px:w-auto"
    >
      <PiPlusBold className="h-4 w-4 mr-1.5" />
      Create Template
    </Button>
  )
}