import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toDataURL } from "qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://calchub.com");
  const [qrImage, setQrImage] = useState("");

  const generate = async () => {
    try {
      const url = await toDataURL(text, { width: 400, margin: 2 });
      setQrImage(url);
    } catch (err) {
      console.error(err);
    }
  };

  const download = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Create custom QR codes for links, text, and more.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Enter Content (URL or Text)</Label>
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <Button className="w-full" onClick={generate}>Generate QR Code</Button>

        {qrImage && (
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="border p-4 bg-white rounded-lg">
              <img src={qrImage} alt="QR Code" className="w-48 h-48" />
            </div>
            <Button variant="outline" onClick={download}>Download PNG</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}