import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, tables } from "@/lib/aws/client";
import { Schedule } from "@/types/schedule";

export async function getItemSchedules() {
  const result = await docClient.send(
    new ScanCommand({ TableName: tables.schedules, FilterExpression: "attribute_exists(itemId)" })
  );
  return (result.Items as Schedule[]) || [];
}

export async function getCategorySchedules() {
  const result = await docClient.send(
    new ScanCommand({ TableName: tables.schedules, FilterExpression: "attribute_exists(categoryId)" })
  );
  return (result.Items as Schedule[]) || [];
}

export async function createSchedule(schedule: Schedule) {
  await docClient.send(new PutCommand({ TableName: tables.schedules, Item: schedule }));
}

export async function updateSchedule(schedule: Schedule) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.schedules,
      Key: { scheduleId: schedule.scheduleId },
      UpdateExpression: "set startDate = :startDate, endDate = :endDate, timeslots = :timeslots",
      ExpressionAttributeValues: {
        ":startDate": schedule.startDate,
        ":endDate": schedule.endDate,
        ":timeslots": schedule.timeslots,
      },
    })
  );
}

export async function deleteSchedule(scheduleId: string) {
  await docClient.send(new DeleteCommand({ TableName: tables.schedules, Key: { scheduleId } }));
}
