import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../state/actions/site";
import { AppState } from "../state/reducers";
import { SiteState } from "../state/reducers/site";
import { Page } from "../state/types";
import { Flex, Center, Image, FlexProps, CenterProps } from "@chakra-ui/core";

export default function Menu(props: FlexProps) {
  const items: Array<Page> = [
    "shoplist",
    "favourite",
    "search",
    "recently",
    "settings",
  ];
  const site: SiteState = useSelector((state: AppState) => state.site);
  const dispatch = useDispatch();

  const onClick = (item: Page) => {
    dispatch(setPage(item));
  };

  return (
    <Flex {...props}>
      {items.map((item) => {
        const styles: CenterProps =
          site.page === item
            ? {
                bg: "secondary.caspion",
                w: "60px",
                h: "60px",
              }
            : {
                bg:
                  site.mode === "light"
                    ? "secondary.azure"
                    : "secondary.graphiteBlue",
                w: "50px",
                h: "50px",
              };

        return (
          <Center
            key={item}
            borderRadius="50%"
            p={4}
            {...styles}
            onClick={(e) => onClick(item)}
            _hover={{ cursor: "pointer" }}
          >
            <Image
              src={`https://duck-duck-code.s3.eu-central-1.amazonaws.com/icons/menu/${item}.svg`}
            />
          </Center>
        );
      })}
    </Flex>
  );
}
