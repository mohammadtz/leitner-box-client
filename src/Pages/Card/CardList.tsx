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

  const deleteCard = async (item: ICard) => {
    setLoader(true);
    try {
      const res = await sendRequest({
        url: `/cards/${item._id}`,
        method: "delete",
      });
      if (res.status === 200) {
        getCardsHistory();
        const count = await GetCount();
        context.CountStore = count.data;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  return useObserver(() => (
    <div style={{ width: "90%" }}>
      <Table
        dataSource={data}
        columns={[
          {
            dataField: "front",
            caption: RenderMessage().general.question,
          },
          {
            caption: RenderMessage().general.box_number,
            itemRender: (item) => {
              if (item.box_number === 6) {
                return RenderMessage().main.menu.card_history;
              } else {
                return item.box_number;
              }
            },
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
                    deleteCard(item);
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
    </div>
  ));
};
