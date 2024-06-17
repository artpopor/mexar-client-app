import { AutoComplete, SelectProps } from "antd"
import { IoMdClose } from "react-icons/io"
type Props = {
  onSelect?: SelectProps<any>["onSelect"];
  onSearch?: (event: any) => void
  children?: React.ReactNode;
  placeholder?: string
  value?: any
  selectCard?: {
    imageUrl?: string | undefined;
    title?: string | undefined;
    subtitle?: string | undefined;
    rightText?: string | undefined;
  }
  onClose?: () => void
  cardClassName? : string
}
const SearchSelect = ({ onSelect, onSearch, children, value, cardClassName, selectCard, onClose, placeholder }: Props) => {
  const baseCardClassName = 'bg-white h-28 w-full shadow-lg rounded-2xl p-2 max-w-[430px] self-center '+ cardClassName
  return (
    <>
      {value &&
        <div className={baseCardClassName}>
          <div className="flex flex-col relative h-full">
            <IoMdClose className="hover:text-red-500 text-gray-500 absolute right-2  top-2 cursor-pointer" onClick={onClose} />
            <div className="flex flex-row justify-start items-center  gap-4 h-full w-full ml-3 ">

              {selectCard?.imageUrl && <img src={selectCard?.imageUrl} className="h-[70%] aspect-square rounded-full" />}                
              <div className="flex flex-col text-gray-500">
                <p className="text text-[#2d4da3]">{selectCard?.title}</p>
                <p className="text-sm">{selectCard?.subtitle}</p>
              </div>
              <div className="w-full text-right text-gray-500 mr-10"><p className="text-xs text-gray-400"></p>{selectCard?.rightText}</div>
            </div>
          </div>
        </div> ||
        <AutoComplete
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder={placeholder}
          className="!w-full h-14"
          defaultOpen
        >
          {children}
        </AutoComplete>}
    </>
  )
}

export default SearchSelect