/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Table } from "../../Components/Table/Table";
import { GetCount, ICount, sendRequest, setStore } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import { StoreContext } from "../../Store";
import { ICard } from "../../Types";
import moment from "moment-jalaali";
import { Loader } from "../../Components/Loader/Loader";
import { useLocalStore, useObserver } from "mobx-react-lite";

interface ILocal {
  visibles: boolean[];
}

const localStore: ILocal = {
  visibles: [],
};

export const CardList = () => {
  const context = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const local = useLocalStore(() => localStore);
  const [data, setData] = useState<any[]>();

  const getCardsHistory = async () => {
    setLoader(true);
    let res;
    try {
      res = await sendRequest({
        url: "/cards",
      });
      for (let i = 0; i < res.data.length; i++) {
        local.visibles.push(false);
      }

      if (res.status === 200) {
        setData(res.data);
        const count: AxiosResponse<ICount> = await sendRequest({
          url: "/cards/count",
        });
        if (count.data) {
          setStore("count", count.data);
          context.CountStore = count.data;
        }
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCardsHistory();
  }, []);

  const deleteCard = async (item: ICard, ref: { refresh: boolean }) => {
    setLoader(true);
    try {
      ref.refresh = true;
      const res = await sendRequest({
        url: `/cards/${item._id}`,
        method: "delete",
      });
      if (res.status === 200) {
        const count = await GetCount();
        context.CountStore = count.data;
        getCardsHistory();
      }
    } catch (error) {
    } finally {
      ref.refresh = false;
      setLoader(false);
    }
  };

  return useObserver(() => (
    <>
      <Table
        dataSource={data}
        columns={[
          {
            dataField: "front",
            caption: RenderMessage().general.question,
          },
          {
            dataField: "box_number",
            caption: RenderMessage().general.box_number,
          },
          {
            caption: RenderMessage().general.create_date,
            itemRender: (item) => (
              <div dir="ltr" style={{ textAlign: "end" }}>
                {moment(item.date).format("jYYYY/jMM/jDD - hh:mm")}{" "}
              </div>
            ),
          },
          {
            caption: RenderMessage().general.answer,
            itemRender: (item, index) => {
              return (
                <Button
                  type="text"
                  color={local.visibles[index] ? undefined : "danger"}
                  onClick={() =>
                    (local.visibles[index] = !local.visibles[index])
                  }
                >
                  {local.visibles[index]
                    ? item.back
                    : RenderMessage().pages.card.show_answer}
                </Button>
              );
            },
          },
          {
            caption: RenderMessage().general.operation,
            itemRender: (item, index, ref) => {
              return (
                <Button
                  type="text"
                  onClick={() => {
                    deleteCard(item, ref);
                  }}
                  color="danger"
                  className="ms-2"
                >
                  {RenderMessage().general.delete}
                </Button>
              );
            },
            width: 200,
          },
        ]}
      ></Table>
      <Loader visible={loader} />
    </>
  ));
};
