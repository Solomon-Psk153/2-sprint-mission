type Modify<T, R> = Omit<T, keyof R> & R;
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;