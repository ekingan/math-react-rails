export const statuses = ['todo', 'in_progress', 'need_info', 'need_signatures', 'ready', 'filed', 'accepted', 'done'];
export const optionsMap = (categories) => categories?.map(({ id: value, name: label }) => ({ value, label }));
export const defaultDate = new Date().getFullYear() - 1;