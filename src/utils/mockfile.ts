export default function mockfile(datalist: any) {
  let n = 1;
  let newdatalist = datalist.map((item: any, i: any) => {
    return {
      uid: item.id ? item.id : n++,
      name: item.attachmentName,
      status: 'done',
      url: item.attachUrl,
    };
  });
  return {
    fileList: newdatalist,
  };
}
