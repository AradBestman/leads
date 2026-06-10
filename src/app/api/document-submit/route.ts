import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL as string,
      data,
    );

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send data to n8n",
      },
      {
        status: 500,
      },
    );
  }
};
