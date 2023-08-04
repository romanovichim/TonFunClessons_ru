import type { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import { FormProvider } from './context';
import ErrorList, { type ErrorListProps } from './ErrorList';
import InternalForm, { type FormInstance, type FormProps, useForm, useWatch } from './Form';
import Item, { type FormItemProps } from './FormItem';
import List, { type FormListFieldData, type FormListOperation, type FormListProps } from './FormList';
import useFormInstance from './hooks/useFormInstance';
type InternalFormType = typeof InternalForm;
type CompoundedComponent = InternalFormType & {
    useForm: typeof useForm;
    useFormInstance: typeof useFormInstance;
    useWatch: typeof useWatch;
    Item: typeof Item;
    List: typeof List;
    ErrorList: typeof ErrorList;
    Provider: typeof FormProvider;
    /** @deprecated Only for warning usage. Do not use. */
    create: () => void;
};
declare const Form: CompoundedComponent;
export type { FormInstance, FormProps, FormItemProps, ErrorListProps, Rule, RuleObject, RuleRender, FormListProps, FormListFieldData, FormListOperation, };
export default Form;
