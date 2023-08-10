import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import style from "../../../css/admin/AdminSales.module.css";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryPortal,
  VictoryAxis,
} from "victory";

const AdminSalesTableRow = (props) => {
  const { board } = props;

  const dto = board.month_SalesDTO;

  const dtoLoop = [];
  for (let i = 0; i < dto.length; i++) {
    dtoLoop.push(i);
  }

  //console.log(board.main_code);

  return (
    <div className={style.group}>
      <div>{board.main_code}</div>
      <div>
        <img src={board.filepath} width={180} height={100} />
      </div>
      <div>
        <div className={style.gymname}>{board.filename}</div>
        <div className={style.data}>
          <Accordion dto={board.month_SalesDTO} dtoLoop={dtoLoop}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <span>매출보기</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <table class="table table-striped" style={{ margin: "50px 0" }}>
                  <thead>
                    <tr>
                      <th>년월</th>
                      <th>연매출 순위</th>
                      <th>연간 매출액</th>
                      <th>월간 매출액</th>
                      <th>월매출 증감률</th>
                      <th>월매출 증감액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dtoLoop &&
                      dtoLoop.map((num, idx) => {
                        const dtoItem = dto[num];
                        return (
                          <tr key={num}>
                            <td>{dtoItem.month}</td>
                            <td>{board.sales_rank}위</td>
                            <td>{board.yearly_sales.toLocaleString()}원</td>
                            <td>
                              {Number(dtoItem.total_sales).toLocaleString()}원
                            </td>
                            <td>{dtoItem.sales_diff_percent}%</td>
                            <td>
                              {Number(dtoItem.sales_diff).toLocaleString()}원
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div>
                  <VictoryChart domainPadding={40}>
                    <VictoryStack
                      colorScale={["orange"]}
                      style={{
                        data: { width: 30 },
                        labels: { padding: -20 },
                      }}
                      labelComponent={
                        <VictoryPortal>
                          <VictoryLabel />
                        </VictoryPortal>
                      }
                    >
                      <VictoryBar
                        data={dtoLoop.map((num) => ({
                          x: dto[num].month,
                          y: dto[num].total_sales,
                          label: dto[num].total_sales.toLocaleString(),
                        }))}
                      />
                    </VictoryStack>
                    <VictoryAxis />
                  </VictoryChart>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesTableRow;
