import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateTimeAbstract } from "../../../../utils/entities/DateTimeAbstract";
import { UserDetailListings } from "./detailListing";
import { ImageUrlPrefixTransformer } from "../../../../utils/entities/ImageUrlTransformer";

@Entity()
export class DetailListingImages extends DateTimeAbstract {
  @PrimaryGeneratedColumn("uuid")
  detail_listing_image_id: string;

  @Column({ transformer: new ImageUrlPrefixTransformer() })
  image_url: string;

  @ManyToOne(
    () => UserDetailListings,
    (detailUsedDeal) => detailUsedDeal.detailListingImages
  )
  detailListing: UserDetailListings;
}
