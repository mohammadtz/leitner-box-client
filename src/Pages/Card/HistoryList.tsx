/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Table } from "../../Components/Table/Table";
import { GetCount, ICount, sendRequest, setStore } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import { StoreContext } from "../../Store";
import { ICard } from "../../Types";

interface ILocal {
  visibles: boolean[];
}

const localStore: ILocal = {
  visibles: [],
};

export const HistoryList = () => {
  const context = useContext(StoreContext);
  const local = useLocalStore(() => localStore);
  const [data, setData] = useState<any[]>();

  const getCardsHistory = async () => {
    const res = await sendRequest({
      url: "/cards/history",
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
  };

  useEffect(() => {
    getCardsHistory();
  }, []);

  const backToBox = async (item: ICard, ref: { refresh: boolean }) => {
    console.log(toJS(item));
    try {
      ref.refresh = true;
      const res = await sendRequest({
        url: `/cards/${item._id}`,
        method: "PUT",
        data: {
          front: item.front,
          back: item.back,
        },
      });
      if (res.status === 200) {
        const count = await GetCount();
        context.CountStore = count.data;
        getCardsHistory();
      }
      console.log(res.data);
    } catch (error) {
    } finally {
      // ref.refresh = false;
    }
  };

  const deleteCard = async (item: ICard, ref: { refresh: boolean }) => {
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
      // ref.refresh = false;
    }
  };

  return useObserver(() => (
    <Table
      dataSource={data}
      columns={[
        {
          dataField: "front",
          caption: RenderMessage().general.question,
        },
        {
          caption: RenderMessage().general.answer,
          itemRender: (item, index) => {
            return (
              <Button
                type="text"
                color={local.visibles[index] ? undefined : "danger"}
                onClick={() => (local.visibles[index] = !local.visibles[index])}
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
              <>
                <Button
                  type="text"
                  onClick={() => {
                    backToBox(item, ref);
                  }}
                >
                  {RenderMessage().pages.card.back_to_box}
                </Button>
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
              </>
            );
          },
          width: 200,
        },
      ]}
    ></Table>
  ));
};
