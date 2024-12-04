import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Button } from 'rizzui';

export const ManageBilling = () => {

  return (
    <Button
      className="w-full [@media(min-width:375px)]:w-auto"
    >
      <RiMoneyDollarCircleLine size={20} className="mr-1.5" />
      Manage Billing
    </Button>
  );
};
