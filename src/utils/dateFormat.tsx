function dateFormat(initDate: string) {
  const date = new Date(initDate);
  const formatDate = date.toLocaleDateString();
  return formatDate;
}

export default dateFormat;
