import type { NextPage } from "next";
import SubmissionList from "../components/SubmissionList";
import Layout from "../layouts/default";
import useSubmissions from "../queries/useSubmissions";

const Home: NextPage = () => {
  return (
    <Layout>
      <SubmissionList
        sx={{ flex: 1 }}
        canLike
        query={useSubmissions}
        queryKey="submissions"
      />
    </Layout>
  );
};

export default Home;
