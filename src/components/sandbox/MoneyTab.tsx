import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as React from "react";
import StateInfo from "./state/StateInfo.tsx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { MdOutlinePercent } from "react-icons/md";
import { RiExchangeFundsFill } from "react-icons/ri";
import type { State as GameState } from "../../game/state.ts";

interface MoneyTabProps {
  state: GameState;
}

function MoneyTab({ state }: MoneyTabProps) {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="mt-4 bg-white rounded-xl shadow-lg border-2 overflow-hidden max-w-full">
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
                text={state.character.balance.toFixed(2)}
              />
            </div>
            <div>
              <p className="text-lg">Monthly Salary</p>
              <StateInfo
                icon={<FaRegMoneyBill1 size={20} />}
                text={state.job?.getBruttoIncome().toFixed(2) || "Unemployed"}
              />
            </div>
            <div>
              <p className="text-lg">Monthly Expenses</p>
              <StateInfo
                icon={<FaRegMoneyBill1 size={20} />}
                text={state.character.monthlyExpenses.get().toFixed(2) || "0"}
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
                text={state.zus.alreadyAccummulated.toFixed(2)}
              />
            </div>
            <div>
              <p className="text-lg">Expected Pension</p>
              <StateInfo
                icon={<RiExchangeFundsFill size={20} />}
                text={state.zus.monthlyRetirementIncome.toFixed(2)}
              />
            </div>
            <div>
              <p className="text-lg">Replacement Rate</p>
              <StateInfo
                icon={<MdOutlinePercent size={20} />}
                text={state.zus.getReplacementRatePercentage()}
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default MoneyTab;
