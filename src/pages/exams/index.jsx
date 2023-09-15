import PageView from "../../components/PageView";
import { Outlet } from "react-router-dom";

export default function Exam() {
  return (
    <PageView>
      <Outlet />
    </PageView>
  );
}
