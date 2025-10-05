import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as React from "react";
import StateInfo from "./state/StateInfo.tsx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { MdOutlinePercent } from "react-icons/md";
import { RiExchangeFundsFill } from "react-icons/ri";

const mockedAmount = "15 000zł";
const mockedMonthlySalary = "5 000zł";
const mockedMonthlyExpenses = "3 000zł";
const mockedZUSAccount = "50 000zł";
const mockedExpectedPension = "2 500zł";
const mockedReplacementRate = "50%";

function MoneyTab() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 overflow-hidden max-w-full">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex list-none bg-gray-50">
          <Tab
            className={`flex-1 px-6 py-2 cursor-pointer text-base font-medium border-transparent text-center transition-colors ${
              tabIndex === 0
                ? "bg-white text-gray-900"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
            }`}
          >
            Money
          </Tab>
          <Tab
            className={`flex-1 px-6 py-2 cursor-pointer text-base font-medium border-transparent text-center transition-colors ${
              tabIndex === 1
                ? "bg-white text-gray-900"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
            }`}
          >
            ZUS
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex flex-col gap-3 px-6 py-2">
            <div>
              <p className="text-lg">Savings</p>
              <StateInfo
                icon={<AiOutlineDollarCircle size={20} />}
                text={mockedAmount}
              />
            </div>
            <div>
              <p className="text-lg">Monthly Salary</p>
              <StateInfo
                icon={<FaRegMoneyBill1 size={20} />}
                text={mockedMonthlySalary}
              />
            </div>
            <div>
              <p className="text-lg">Monthly Expenses</p>
              <StateInfo
                icon={<FaRegMoneyBill1 size={20} />}
                text={mockedMonthlyExpenses}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex flex-col gap-3 px-6 py-2">
            <div>
              <p className="text-lg">ZUS Account</p>
              <StateInfo
                icon={<AiOutlineDollarCircle size={20} />}
                text={mockedZUSAccount}
              />
            </div>
            <div>
              <p className="text-lg">Expected Pension</p>
              <StateInfo
                icon={<RiExchangeFundsFill size={20} />}
                text={mockedExpectedPension}
              />
            </div>
            <div>
              <p className="text-lg">Replacement Rate</p>
              <StateInfo
                icon={<MdOutlinePercent size={20} />}
                text={mockedReplacementRate}
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default MoneyTab;
