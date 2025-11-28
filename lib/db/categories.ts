import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, tables } from "@/lib/aws/client";
import { Category } from "@/types/categories";

export async function getCategories() {
  const result = await docClient.send(new ScanCommand({ TableName: tables.categories }));
  return (result.Items as Category[]) || [];
}

export async function createCategory(category: Category) {
  await docClient.send(new PutCommand({ TableName: tables.categories, Item: category }));
}

export async function updateCategory(category: Category) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.categories,
      Key: { categoryId: category.categoryId },
      UpdateExpression: "set #name = :name, active = :active",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: { ":name": category.name, ":active": category.active },
    })
  );
}

export async function toggleCategoryActive(categoryId: string, active: boolean) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.categories,
      Key: { categoryId },
      UpdateExpression: "set active = :active",
      ExpressionAttributeValues: { ":active": active },
    })
  );
}

export async function deleteCategory(categoryId: string) {
  await docClient.send(new DeleteCommand({ TableName: tables.categories, Key: { categoryId } }));
}
