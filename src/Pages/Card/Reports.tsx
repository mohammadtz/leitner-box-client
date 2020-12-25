/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useObserver } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Table } from "../../Components/Table/Table";
import { sendRequest } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import "./Card.scss";
import { FcDocument } from "react-icons/fc";
import { ReportPopup } from "./ReportPopup";

export interface IApiReports {
  totalViews?: number;
  correct?: number;
  incorrect?: number;
  correctPersent?: number;
  incorrectPersent?: number;
}

export interface IHistory {
  _id?: string;
  ViewDate?: string;
  CardREF?: string;
  status?: number;
  userId?: string;
  box_number?: number;
}

export interface IApiHistory {
  _id?: string;
  uniqueId?: string;
  front?: string;
  back?: string;
  userId?: string;
  box_number?: number;
  date?: string;
  visibles?: boolean;
  history?: IHistory[];
}

const reportData = async (): Promise<AxiosResponse<IApiReports>> =>
  await sendRequest({ url: "/report" });
const historyData = async (): Promise<AxiosResponse<IApiHistory[]>> =>
  await sendRequest({ url: "/history" });

export const Reports = () => {
  const [report, setReport] = useState<IApiReports>({});
  const [history, setHistory] = useState<IApiHistory[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IApiHistory>({});

  useEffect(() => {
    reportData().then((response) => {
      setReport(response.data);
    });
    historyData().then((response) => {
      setHistory(response.data.map((item) => ({ ...item, visibles: false })));
    });
  }, []);

  return useObserver(() => (
    <div className="reports">
      <div className="totalView">
        <h2 className="me-1">{RenderMessage().reports.total_views}:</h2>
        <h3>{report.totalViews}</h3>
      </div>
      <div className="reports__card">
        <div className="reports__card__container">
          <div className="reports__card__container__Child">
            <div className="text correct">
              <strong className="me-1">
                {RenderMessage().reports.correct}:
              </strong>
              <span>{report.correct}</span>
            </div>
            <div className="text incorrect">
              <strong className="me-1">
                {RenderMessage().reports.incorrect}:
              </strong>
              <span>{report.incorrect}</span>
            </div>
          </div>
          <div className="reports__card__container__Child">
            <div className="text correct_persent">
              <strong className="me-1">
                {RenderMessage().reports.correct_persent}:
              </strong>
              <span>{report.correctPersent?.toFixed(2)} %</span>
            </div>
            <div className="text incorrect_persent">
              <strong className="me-1">
                {RenderMessage().reports.incorrect_persent}:
              </strong>
              <span>{report.incorrectPersent?.toFixed(2)} %</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Table
        dataSource={history}
        columns={[
          {
            dataField: "front",
            caption: RenderMessage().general.question,
          },
          {
            caption: RenderMessage().general.answer,
            itemRender: (item: IApiHistory, index) => {
              return (
                <Button
                  type="text"
                  color={item.visibles ? undefined : "danger"}
                  onClick={() => {
                    const temp = [...history];
                    temp[index].visibles = !temp[index].visibles;
                    setHistory(temp);
                  }}
                >
                  {item.visibles
                    ? item.back
                    : RenderMessage().pages.card.show_answer}
                </Button>
              );
            },
          },
          {
            caption: RenderMessage().general.box_number,
            itemRender: (item: IApiHistory) => item.box_number,
          },
          {
            caption: RenderMessage().general.operation,
            itemRender: (item: IApiHistory) => {
              return (
                <Button
                  type="text"
                  onClick={() => {
                    item.history && setSelectedRow(item);
                    setPopupVisible(true);
                  }}
                >
                  <FcDocument
                    fontSize={32}
                    title={RenderMessage().general.details}
                  />
                </Button>
              );
            },
          },
        ]}
      />
      <ReportPopup
        visible={popupVisible}
        data={selectedRow}
        onClose={() => setPopupVisible(false)}
      />
    </div>
  ));
};
