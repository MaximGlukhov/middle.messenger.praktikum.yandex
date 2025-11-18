export const formatTime = (dateString: string | undefined): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  if (diffInDays < 2) {
    return 'Вчера';
  }

  if (diffInDays < 7) {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' });
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};
