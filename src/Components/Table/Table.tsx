/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { ReactNode, useEffect } from "react";
import { Img_Loader } from "../../assets/Export";
import "./Table.scss";

interface ITable {
  dataSource?: () => Promise<AxiosResponse<any>>;
  columns?: {
    dataField?: string;
    caption?: string;
    itemRender?: (item: any, index: number, ref: ILocalStore) => ReactNode;
    width?: string | number;
  }[];
  refresh?: (ref: { refresh: boolean }) => void;
}

interface ILocalStore {
  data: any[];
  refresh: boolean;
}

export const Table: React.FC<ITable> = (props) => {
  const localStore: ILocalStore = { data: [], refresh: false };
  const local = useLocalStore(() => localStore);

  useEffect(() => {
    getData(props, local);
  }, [props.dataSource, local.refresh]);

  const renderCaption = () => {
    return props.columns?.map((item, index) => {
      return <th key={index}>{item.caption || item.dataField}</th>;
    });
  };

  const renderRow = () => {
    return local.data.map((item, index) => {
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
      <table className="table">
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

function getData(props: React.PropsWithChildren<ITable>, local: ILocalStore) {
  try {
    local.refresh = true;
    props.dataSource &&
      props.dataSource().then((res) => {
        local.data = res.data;
      });
  } catch (error) {
  } finally {
    local.refresh = false;
  }
}
