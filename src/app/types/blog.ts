export interface Blog {
  id: number;
  description: string;
  title: string;
  content: string;
  image: string;
  isFeatured: boolean;
  categoryId: string;
  createdOn: string;
  createdBy: string | null;
  modifiedOn: string;
  modifiedBy: string | null;
}
