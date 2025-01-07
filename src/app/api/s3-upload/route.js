// import { APIRoute } from "next-s3-upload";
import { POST as route } from "next-s3-upload/route";

export const POST = route.configure({
  async key(request, filename) {
    try {
      const url = request.url.split('?')[1];
      const params = new URLSearchParams(url);
      const dir = params.get('dir');
      // let dir = request.body.dir; // 123

      return `media/${dir}/${filename}`;
    } catch (error) {
      console.log(error)
      return Response.error();
    }
  },
});
