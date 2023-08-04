import type { ValidateStatus } from 'antd/es/form/FormItem';
type UseFormItemStatus = () => {
    status?: ValidateStatus;
};
declare const useFormItemStatus: UseFormItemStatus;
export default useFormItemStatus;
