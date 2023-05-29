export interface IDynaFormConsumer<TData> {
    data: TData;
    valid: boolean;
    dirty: boolean;
    statusChange: (valid: boolean) => void;
    valueChange: (data: TData) => void;
}