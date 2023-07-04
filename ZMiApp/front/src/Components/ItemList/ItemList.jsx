import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import "./itemlist.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ItemList = ({ data }) => {
  return (
    <div className="cardContenedor">
      {data.map((item) => (
        <Card key={item.id} variant="outlined" sx={{ width: 250 }}>
          <div>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
              {item.title}
            </Typography>
            <Typography level="body2">April 24 to May 02, 2021</Typography>
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            >
              <BookmarkAdd />
            </IconButton>
          </div>
          <AspectRatio minHeight="120px" maxHeight="200px">
            {item.images.length > 0 ? (
              <Carousel>
                {item.images.map((image) => (
                  <div key={image}>
                    <img src={image} alt="Product Image" />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p>No hay imágenes disponibles</p>
            )}
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body3">Total price:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                ${item.price}
              </Typography>
            </div>
            <Button
              variant="solid"
              size="sm"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", fontWeight: 600 }}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default ItemList;
