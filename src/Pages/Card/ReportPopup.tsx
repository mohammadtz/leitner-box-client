import React, { CSSProperties, useState } from "react";
import { Popup } from "../../Components/Popup/Popup";
import { Table } from "../../Components/Table/Table";
import { RenderMessage } from "../../Localization/RenderMessage";
import { IApiHistory, IHistory } from "./Reports";
import moment from "moment-jalaali";
import { Button } from "../../Components/Button/Button";

interface IReportPopup {
  visible?: boolean;
  data?: IApiHistory;
  onClose?: () => void;
}

export const ReportPopup: React.FC<IReportPopup> = (props) => {
  const [answerShow, setAnswerShow] = useState(false);
  const tableContainerStyle: CSSProperties = {
    overflow: "auto",
    maxHeight: 400,
  };

  const buttonsContainerStyle: CSSProperties = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  };

  const historyReporterStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem",
  };

  return (
    <Popup visible={props.visible} width={"70%"}>
      <div style={historyReporterStyle}>
        <div style={{ width: "50%", marginBottom: "1rem" }}>
          <strong className="me-1">{RenderMessage().general.question}:</strong>
          <span>{props.data?.front}</span>
        </div>
        <div style={{ width: "50%", marginBottom: "1rem" }}>
          <strong className="me-1">
            {RenderMessage().general.box_number}:
          </strong>
          <span>{props.data?.box_number}</span>
        </div>
        <div style={{ width: "50%" }}>
          <strong className="me-1">
            {RenderMessage().general.create_date}:
          </strong>
          <span>{moment(props.data?.date).format("jYYYY/jMM/jDD HH:mm")}</span>
        </div>
        <div style={{ width: "50%" }}>
          <strong className="me-1">{RenderMessage().general.answer}:</strong>
          {answerShow ? (
            <span onClick={() => setAnswerShow(false)}>{props.data?.back}</span>
          ) : (
            <Button
              type="text"
              className="danger"
              onClick={() => setAnswerShow(true)}
            >
              {RenderMessage().pages.card.show_answer}
            </Button>
          )}
        </div>
      </div>
      <br />
      <div style={tableContainerStyle}>
        <Table
          width={"100%"}
          dataSource={props.data?.history}
          columns={[
            {
              caption: RenderMessage().general.status,
              itemRender: (item: IHistory) =>
                item.status === 1 ? (
                  <span className="success">
                    {RenderMessage().reports.correct}
                  </span>
                ) : (
                  <span className="danger">
                    {RenderMessage().reports.incorrect}
                  </span>
                ),
            },
            {
              caption: RenderMessage().general.show_date,
              itemRender: (item: IHistory) =>
                moment(item.ViewDate).format("jYYYY/jMM/jDD HH:mm"),
            },
            {
              caption: RenderMessage().general.box_number,
              dataField: "box_number",
            },
          ]}
        />
      </div>
      <div style={buttonsContainerStyle}>
        <Button onClick={props.onClose}>{RenderMessage().general.close}</Button>
      </div>
    </Popup>
  );
};
