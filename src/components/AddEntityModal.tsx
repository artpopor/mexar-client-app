import { useForm, Controller } from 'react-hook-form';
import { AutoComplete, Select, Modal, notification } from "antd";
import Input from "./Input";
import InputSelect from "./InputSelect";
import Button from "./Button";
import CountryCodeWithFlag from '../assets/CountryCodeWithFlag.json';
import { useState } from 'react';
import { useGetCountryListQuery, useCreateEntityMutation } from '../services/apiStore';
import SearchSelect from './SearchSelect';
type modalType = {
  open: boolean;
  onCancel: () => void;
};

const AddEntityModal = ({ open, onCancel }: modalType) => {
  let [phone, setPhone] = useState<string>('')
  let [entityType, setEntityType] = useState<string>()
  const { Option } = AutoComplete;
  const [createEntity] = useCreateEntityMutation();
  const [dialCode, setDialCode] = useState<string>('+66')
  const access_token = localStorage.getItem("access_token");
  const CountryListData = useGetCountryListQuery(access_token);
  const CountryListSorted = CountryListData?.data?.data?.slice().sort((a: any, b: any) => a.common_name.localeCompare(b.common_name));

  const [selectedCountry, setSelectedCountry] = useState<any>()
  const [options, setOptions] = useState<[]>([]);

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    data.phone_number = phone
    data.phone_dial_code = dialCode
    data.nationality_country_id = selectedCountry.id
    data.entity_type = entityType
    if (entityType == 'individual') {
      delete data.name
    } else if (entityType == 'corporate') {
      delete data.first_name
      delete data.last_name
      delete data.middle_name
    }

    const res = await createEntity({ data: data, token: access_token })
    if (res.data) {
      notification.success({
        message: 'Form Submitted',
        description: 'entity created!',
      });
      let itemsArray = JSON.parse(localStorage.getItem('savedEntity') || '') || [];
      itemsArray.push(res.data);
      onCancel()
    } else {
      notification.error({
        message: 'Form is not Submitted',
        description: 'something wrong!',
      });
    }






  };
  const onDeselectCountry = () => {
    setSelectedCountry(null)
  }
  const onCountrySelect = (value: any) => {
    const selectedOption = CountryListSorted.find(
      (item: any) => item.common_name === value
    );
    selectedOption && setSelectedCountry(selectedOption);
  };
  const handleCountrySearch = (value: string) => {
    const filteredOptions = CountryListSorted.filter((item: any) =>
      item.common_name.toUpperCase().startsWith(value.toUpperCase())
    );
    setOptions(filteredOptions);
  };

  return (
    <>
      <Modal width={'95vw'} footer={null} open={open} closable onCancel={onCancel}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-auto flex flex-col justify-between">
            <div>
              <p className="font-thin text-gray-500 mb-2">Add new CRM entities</p>
              <div className="flex flex-col gap-4">

                <Select onChange={e => setEntityType(e)} placeholder='Entity type' className="h-14"
                  options={[
                    { value: 'individual', label: <span>individual</span> },
                    { value: 'corporate', label: <span>corporate</span> }
                  ]} />

                <Controller
                  name="primary_language"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder='Language' className="h-14" options={[
                      { value: 'en', label: <span>en</span> },
                      { value: 'id', label: <span>id</span> },
                      { value: 'zh', label: <span>zh</span> }
                    ]} />
                  )}

                />
                {entityType == 'individual' &&
                  <>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Firstname" theme="border" />
                      )}
                    />
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Lastname" theme="border" />
                      )}
                    />
                    <Controller
                      name="middle_name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Middlename" theme="border" />
                      )}
                    />
                  </> || <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="name" theme="border" />
                    )}
                  />}
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder='Gender'
                      options={[
                        { value: 'm', label: <span>Male</span> },
                        { value: 'f', label: <span>Female</span> }
                      ]}
                      className="h-14 col-span-2"
                    />
                  )}
                />

                <div className='col-span-2'>
                  <SearchSelect
                    onSelect={onCountrySelect}
                    onSearch={handleCountrySearch}
                    value={selectedCountry}
                    onClose={onDeselectCountry}
                    placeholder="Living Country"
                    selectCard={
                      {
                        imageUrl: selectedCountry?.flag,
                        title: selectedCountry?.common_name,
                        subtitle: selectedCountry?.region,
                        rightText: selectedCountry?.currency_code
                      }
                    }
                  >
                    {options.map((item: any) => (
                      <Option key={item.id} value={item?.common_name}>
                        <div className="flex gap-2">
                          <img src={item.flag} className="w-6 h-6 rounded-full" />
                          <p>{item.common_name}</p>
                        </div>
                      </Option>
                    ))}
                  </SearchSelect>


                </div>

                <InputSelect
                  onChangeInput={(e) => setPhone(e.target.value)}
                  onSelect={(e) => setDialCode(e)}
                  defaultSelectValue='+66'
                  className="!text-gray-500 !col-span-2"
                  inputPlaceHolder="xx-xxx-xxx"
                >
                  {CountryCodeWithFlag?.map((item: { name: string, code: string, emoji: string, image: string, dial_code: string }) => (
                    <Select.Option key={item?.code} value={item?.dial_code}>
                      <div className="flex flex-cols gap-2 justify-center content-center self-center">
                        <p>{item?.emoji}</p>
                        <p>{item?.dial_code}</p>
                      </div>
                    </Select.Option>
                  ))}
                </InputSelect>

              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" className="!bg-[#2d4da3] text-white">Save</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddEntityModal;
