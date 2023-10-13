const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const allGroups = await prisma.Group.findMany(); 
    res.send(allGroups)
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
    try {
      const group = await prisma.Group.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(group);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id",  async (req, res, next) => {
  
    try {
      const group = await prisma.Group.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send(group);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    // console.log('req body from post', req.body);
    try {
      const testUser = 1
      const {name} = req.body
      const group = await prisma.Group.create({
        data: {
          userId: testUser, 
          name, 
        }
      });

      const role = await prisma.role.create({
        data: {
          user_id: testUser, 
          group_id: group.id,
          is_admitted: true, 
          is_creator: true
        }
      })

      console.log('req body from post request', req.body);
      const response = {
        group, 
        role,
      }
      res.send(response);
    } catch (err) {
      console.error("Error adding group", err)
      res.status(500).send(err.message);
      next(err);
    }
  });

  router.put("/:id",  async (req, res, next) => {
  
    try {
      const group = await prisma.Group.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });
      res.send(group);
    } catch (err) {
      next(err);
    }
  });


module.exports = router


// * updates required 
// * 1. create & assign role when group is created 
// * 2. 
// * 3. 