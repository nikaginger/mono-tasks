/**
 * Форматирует дату в строку вида "Jul 19, 2025".
 * @param {string} dateString - Дата в формате ISO (например, "2025-07-19T00:00:00Z").
 * @returns {string} Отформатированная дата (например, "Jul 19, 2025").
 */

export const formatCreatedAt = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};
