export class NodeData {
  public nodeName:string;
  public dataType:any;
  public data:any;
  public accessor:string;
  public filePath:string;
  constructor(name,type,data,accessor,filePath) {
    this.nodeName = name;
    this.dataType = type;
    this.data = data;
    this.accessor = accessor;
    this.filePath = filePath
  }
}
