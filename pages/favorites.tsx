import type { NextPage } from "next";
import SubmissionList from "../components/SubmissionList";
import Layout from "../layouts/default";
import useFavorites from "../queries/useFavorites";

// unliking a submission here will not remove it immediately from the view (so user can like it again). It is removed in the next refresh

const Favorites: NextPage = () => {
  return (
    <Layout>
      <SubmissionList
        sx={{ p: 4, flex: 1 }}
        canLike
        query={useFavorites}
        queryKey="favorites"
      />
    </Layout>
  );
};

export default Favorites;
