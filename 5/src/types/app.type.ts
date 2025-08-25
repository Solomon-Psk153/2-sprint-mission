type PortReturnType = string | number | boolean;

type AddressInfoType = {
  address: string;
  family: string;
  port: number;
};

type ServerAddressType = AddressInfoType | string | null