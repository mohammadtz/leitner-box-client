/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { ReactNode } from "react";
import { Img_Loader } from "../../assets/Export";
import "./Table.scss";

interface ITable {
  dataSource?: any[];
  columns?: {
    dataField?: string;
    caption?: string;
    itemRender?: (item: any, index: number, ref: ILocalStore) => ReactNode;
    width?: string | number;
  }[];
  refresh?: (ref: { refresh: boolean }) => void;
  width?: string | number;
}

interface ILocalStore {
  data: any[];
  refresh: boolean;
}

export const Table: React.FC<ITable> = (props) => {
  const localStore: ILocalStore = { data: [], refresh: false };
  const local = useLocalStore(() => localStore);

  const renderCaption = () => {
    return props.columns?.map((item, index) => {
      return <th key={index}>{item.caption || item.dataField}</th>;
    });
  };

  const renderRow = () => {
    console.log(props.dataSource);

    return props.dataSource?.map((item, index) => {
      return (
        <tr key={index}>
          {props.columns?.map((child, i) => {
            if (child.itemRender) {
              return (
                <td key={i} style={{ width: child.width }}>
                  {child.itemRender(item, index, local)}
                </td>
              );
            }
            return <td key={i}>{item[`${child.dataField}`]}</td>;
          })}
        </tr>
      );
    });
  };

  return useObserver(() => (
    <>
      <table className="table" style={{ width: props.width }}>
        <thead>
          <tr>{renderCaption()}</tr>
        </thead>
        <tbody>{renderRow()}</tbody>
        {local.refresh ? (
          <div className="table__loader">
            <img src={Img_Loader} alt="" />
          </div>
        ) : null}
      </table>
    </>
  ));
};
