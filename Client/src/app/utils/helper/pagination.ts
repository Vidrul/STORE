import _ from "lodash";
import { IGoods } from "../../models/IGoods";

export function paginate(items: IGoods[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
